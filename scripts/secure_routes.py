#!/usr/bin/env python3
"""Patch the remaining API routes to add auth checks."""
import re
from pathlib import Path

ROUTES = [
    "accounting/accounts", "accounting/journal", "cashier/invoices",
    "hr/employees", "hr/attendance", "hr/leaves", "hr/payroll",
    "erp/products", "erp/suppliers", "erp/purchase-orders",
]

BASE = Path("/home/z/my-project/src/app/api")

for route in ROUTES:
    p = BASE / route / "route.ts"
    if not p.exists():
        print(f"skip {route}: not found")
        continue
    txt = p.read_text()
    # Skip if already has requireAuth
    if "requireAuth" in txt:
        print(f"skip {route}: already secured")
        continue
    # Replace import
    txt = txt.replace(
        'import { getFirstOrg } from "@/lib/erp-helpers";',
        'import { requireAuth } from "@/lib/auth";'
    )
    txt = txt.replace(
        'import { getFirstOrg, daysAgo } from "@/lib/erp-helpers";',
        'import { requireAuth } from "@/lib/auth";\nimport { daysAgo } from "@/lib/erp-helpers";'
    )
    txt = txt.replace(
        'import { getFirstOrg, getMainBranch } from "@/lib/erp-helpers";',
        'import { requireAuth } from "@/lib/auth";'
    )
    # Replace org fetching
    txt = txt.replace(
        "const org = await getFirstOrg();",
        'const auth = await requireAuth();\n  if (auth.error || !auth.user) return NextResponse.json({ error: "غير مصرّح" }, { status: auth.status });\n  const org = { id: auth.user.organizationId };'
    )
    # If there's getMainBranch being called - replace with branch from user
    txt = txt.replace(
        "const branch = await getMainBranch();",
        'const branch = auth.user.branchId ? await db.branch.findUnique({ where: { id: auth.user.branchId } }) : await db.branch.findFirst({ where: { organizationId: org.id } });'
    )
    p.write_text(txt)
    print(f"patched {route}")
