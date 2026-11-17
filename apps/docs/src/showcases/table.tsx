import {Badge} from "@rixl/ui/badge";
import {Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@rixl/ui/table";
import type {ControlValue, Example} from "./registry";

export const path = "table";
export const title = "Table";
export const description = "Present structured information in rows and columns.";
export const notes =
  "Plain HTML table styled as a data grid. Row hover + selected states; opt-in sticky header (`sticky`) and opt-in scroll via `containerClassName`.";

export function Showcase() {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV-001</TableCell>
            <TableCell>
              <Badge variant="success">Paid</Badge>
            </TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

function BasicExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <div className="w-full max-w-2xl">
      <Table>
        <TableCaption>A list of recent workspace invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV-001</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>
              <Badge variant="success">Paid</Badge>
            </TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV-002</TableCell>
            <TableCell>Bank Transfer</TableCell>
            <TableCell>
              <Badge variant="warning">Pending</Badge>
            </TableCell>
            <TableCell className="text-right">$150.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV-003</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>
              <Badge variant="success">Paid</Badge>
            </TableCell>
            <TableCell className="text-right">$350.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right font-semibold">$750.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export const examples: Example[] = [{id: "basic", title: "Invoices table", render: BasicExample}];
