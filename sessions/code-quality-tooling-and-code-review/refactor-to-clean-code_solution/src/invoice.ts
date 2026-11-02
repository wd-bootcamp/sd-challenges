export type InvoiceLine = {
  description: string;
  unitPrice: number;
  quantity: number;
};

export type InvoiceOptions = {
  currency: string;
  vatRate: number;
  applyDiscount: boolean;
};

const DISCOUNT_TIERS = [
  { subtotalAbove: 200, rate: 0.15 },
  { subtotalAbove: 100, rate: 0.1 },
  { subtotalAbove: 50, rate: 0.05 },
];

function formatMoney(amount: number): string {
  return amount.toFixed(2);
}

function calculateLineTotal(line: InvoiceLine): number {
  return line.quantity * line.unitPrice;
}

function renderLine(line: InvoiceLine): string {
  if (line.unitPrice <= 0) {
    return `${line.description}: free`;
  }
  const unitPrice = formatMoney(line.unitPrice);
  const lineTotal = formatMoney(calculateLineTotal(line));
  return `${line.description}: ${line.quantity} x ${unitPrice} = ${lineTotal}`;
}

function findDiscountRate(subtotal: number): number {
  const tier = DISCOUNT_TIERS.find(
    ({ subtotalAbove }) => subtotal > subtotalAbove,
  );
  return tier?.rate ?? 0;
}

export function renderInvoice(
  lines: InvoiceLine[],
  { currency, vatRate, applyDiscount }: InvoiceOptions,
): string {
  const billableLines = lines
    .filter((line) => line.quantity > 0)
    .sort((a, b) => a.description.localeCompare(b.description));

  const subtotal = billableLines.reduce(
    (sum, line) => sum + calculateLineTotal(line),
    0,
  );
  const discount = applyDiscount ? subtotal * findDiscountRate(subtotal) : 0;
  const netTotal = subtotal - discount;
  const vat = netTotal * vatRate;

  const output = billableLines.map(renderLine);
  if (discount > 0) {
    output.push(`Discount: -${formatMoney(discount)}`);
  }
  output.push(
    `Subtotal: ${formatMoney(netTotal)}`,
    `VAT (${Math.round(vatRate * 100)}%): ${formatMoney(vat)}`,
    `Total: ${formatMoney(netTotal + vat)} ${currency}`,
  );
  return `${output.join("\n")}\n`;
}
