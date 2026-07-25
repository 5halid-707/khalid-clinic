#!/usr/bin/env python3
"""Patch remaining getFirstOrg calls in API routes."""
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
        continue
    txt = p.read_text()
    # Handle the basic case: const org = await getFirstOrg();
    if "const org = await getFirstOrg();" in txt:
        txt = txt.replace(
            "const org = await getFirstOrg();",
            'const auth = await requireAuth();\n  if (auth.error || !auth.user) return NextResponse.json({ error: "غير مصرّح" }, { status: auth.status });\n  const org = { id: auth.user.organizationId };'
        )
        p.write_text(txt)
        print(f"patched {route}")
    else:
        print(f"skip {route}: no match")
