import {Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@rixl/ui/table";
import {Group, Section} from "./_layout";

export const path = "table";
export const title = "Table";
export const group = "Content";

export function Showcase() {
  return (
    <Section
      title="Table"
      description="Plain HTML table styled as a data grid. Header, body, footer, caption, row, and cell slots."
    >
      <Group label="Basic">
        <Table className="max-w-lg">
          <TableCaption>A list of recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV002</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell className="text-right">$150.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">$400.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Group>
    </Section>
  );
}