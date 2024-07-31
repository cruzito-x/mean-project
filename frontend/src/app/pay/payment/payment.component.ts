import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { OrderInfoComponent } from "../order-info/order-info.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCreditCard, faUser, faAt, faMoneyBill, faAngleLeft, faAngleRight, faPrint } from '@fortawesome/free-solid-svg-icons';
import { PayStepsService } from '../../services/pay-steps.service';
import { PaymentService } from '../../services/payment.service';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ FontAwesomeModule, OrderInfoComponent],
  templateUrl: './payment.component.html',
  styles: ``
})
export class PaymentComponent {
  faCreditCard = faCreditCard;
  faUser = faUser;
  faAt = faAt;
  faMoneyBill = faMoneyBill;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faPrint = faPrint;
  amount = 0;
  cartService = inject(CartService);
  pay_steps = inject(PayStepsService);

  @ViewChild('paymentRef', { static: false }) paymentRef !: ElementRef;

  constructor(private payment: PaymentService) { }

  ngAfterViewInit(): void {
    this.amount = this.payment.amount;
    window.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.cartService.getTotal()
              }
            }
          ]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          Swal.fire({
            text: "Your payment has been processed successfully!",
            icon: "success",
            confirmButtonColor: "#007bff",
            confirmButtonText: "Get receipt",
            showCancelButton: true,
            cancelButtonText: "Go to principal",
            cancelButtonColor: "#dc3545"
          }).then((result) => {
            if (result.isConfirmed) {
              this.printBill(details);
              // localStorage.removeItem("cartList");
              // localStorage.removeItem("clientInfo");
            } else {
              location.href = "/";
              localStorage.removeItem("cartList");
              localStorage.removeItem("clientInfo");
            }
          });
        });
      },
      onError(error: any): void {
        console.log('Payment error ', error);
      }
    }).render(this.paymentRef.nativeElement);
  }

  async printBill(details: any) {
    try {
      const doc = new jsPDF();
      let cartList: any[] = JSON.parse(localStorage.getItem("cartList") || "{}");
      let clientInfo: any[] = JSON.parse(localStorage.getItem("clientInfo") || "{}");
      let address: string = "C.C. Plaza Merliot, 3 nivel local 308, Santa Tecla, La Libertad, El Salvador, Centro América";
      let referencePoint: string = "Between Plaza Merliot Street and Rosa de Lima Street";
      
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("CinnaTech Store - Receipt of purchase", 105, 20, { align: "center" });
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("CinnaTech S.A DE C.V.", 105, 30, { align: "center" });
      doc.text(address, 105, 36, { align: "center" });
      doc.text("Phone: (+503) 2527-8000", 105, 42, { align: "center" });
      doc.text("E-mail: cinnatechstore@gmail.com", 105, 48, { align: "center" });
      
      doc.setLineWidth(0.5);
      doc.line(15, 55, 195, 55);
      
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      doc.text("Transaction details", 105, 65, { align: "center" });
      
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");

      const leftColumnText = `
      Transaction ID: ${ details.id }
      Amount: $${ details.purchase_units[0].amount.value }
      Date: ${moment( details.create_time).format("yyyy/MM/dd") }
      Payment status: ${ details.status }
      Paid by: ${ details.payer.name.given_name } ${ details.payer.name.surname}
      E-mail: ${ details.payer.email_address }
      `;
      doc.text(leftColumnText, 15, 75);
  
      (doc as any).autoTable({
        startY: 105,
        head: [['Product', 'Quantity', 'Price', "Discount"]],
        body: cartList.map((item: any) => [
          (item.category+' '+item.brand[0].name+' '+item.name+' ('+(item.colors[item.indexColor].color).replace("-", " ")+')').toUpperCase(), 
          item.quantity, 
          "$" + item.price, item.discount > 0 ? "$" + (item.price - (item.price - (item.price * item.discount))).toFixed(2) : "$0"]),
        theme: 'striped',
        styles: {
          cellPadding: 5,
          fontSize: 10,
        },
        headStyles: {
          fillColor: ["#cfe2ff"],
          textColor: ["#000000"],
          halign: "center"
        },
        bodyStyles: {
          textColor: ["#000000"],
          halign: "center"
        },
        alternateRowStyles: {
          fillColor: ["#ffffff"]
        }
      });
  
      let posY = (doc as any).lastAutoTable.finalY;

      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      doc.text("Client details", 105, posY + 10, { align: "center" });
      
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");

      const client = `
      Client: ${ clientInfo[0].clientName }
      Phone: ${ clientInfo[0].clientPhone }
      Address: ${ clientInfo[0].clientAddress !== address ? clientInfo[0].clientAddress : "Pick at the store" }
      Reference point: ${ clientInfo[0].referencePoint !== referencePoint ? clientInfo[0].referencePoint : referencePoint }
      Shipping cost: ${ this.cartService.shippingCost() > 0 ? `$${ this.cartService.shippingCost() } (${ clientInfo[0].department+" - "+clientInfo[0].municipality })` : "No shipping cost" }
      ${ clientInfo[0].additionalComments !== "" ? `Additional comments: ${ clientInfo[0].additionalComments }` : "No additional comments"}
      `;

      doc.text(client, 15, posY + 15);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      
      doc.setLineWidth(0.5);
      doc.line(15, posY + 45, 195, posY + 45);
      
      doc.text("Thank you for your purchase!", 105, posY + 55, { align: "center" });
      doc.text("If you have any questions, please do not hesitate to contact us", 105, posY + 61, { align: "center" });
      
      doc.save("Receipt-" + details.id + ".pdf");
      // window.location.href = "/";
    } catch(error) {
      console.error("Error saving bill: ", error);
    }
  }  
}
