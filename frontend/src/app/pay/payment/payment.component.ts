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
                value: this.cartService.getSubTotal()
              }
            }
          ]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          Swal.fire({
            text: "Your payment has been processed successfully! \nYou want print your bill?",
            icon: "success",
            confirmButtonColor: "#007bff",
            confirmButtonText: "Print",
            showCancelButton: true,
            cancelButtonText: "Go to principal",
            cancelButtonColor: "#dc3545"
          }).then((result) => {
            if (result.isConfirmed) {
              this.printBill(details);
              location.href = "/";
              localStorage.removeItem("cartList");
            } else {
              location.href = "/";
              localStorage.removeItem("cartList");
            }
          });
          console.log(details);
        });
      },
      onError(error: any): void {
        console.log('Payment error ', error);
      }
    }).render(this.paymentRef.nativeElement);
  }

  async printBill(details: any) {
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("CinnaTech Store - Receipt of purchase", 105, 20, { align: "center" });
  
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("CinnaTech S.A DE C.V.", 105, 30, { align: "center" });
    doc.text("C.C. Plaza Merliot, 3 nivel local 308, Santa Tecla, La Libertad, El Salvador, Centro América", 105, 36, { align: "center" });
    doc.text("Phone: (+503) 2527-8000", 105, 42, { align: "center" });
    doc.text("E-mail: cinnatechstore@gmail.com", 105, 48, { align: "center" });
  
    doc.setLineWidth(0.5);
    doc.line(15, 55, 195, 55);
  
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("PayPal transaction details", 105, 65, { align: "center" });
  
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const detailsText = `
    Transaction ID: ${details.id}
    Amount: $${details.purchase_units[0].amount.value}
    Date: ${moment(details.create_time).format("yyyy-MM-dd")}
    Payment status: ${details.status}
    Client name: ${details.payer.name.given_name} ${details.payer.name.surname}
    Client e-mail: ${details.payer.email_address}
    `;

    doc.text(detailsText, 15, 75);

    let cartList: any[] = JSON.parse(localStorage.getItem("cartList") || "{}");

    (doc as any).autoTable({
      startY: 110,
      head: [['Product', 'Quantity', 'Price', "Discount"]],
      body: cartList.map((item: any) => [item.name, item.quantity, "$"+item.price, item.discount > 0 ? "$"+(item.price - (item.price - (item.price * item.discount))).toFixed(2) : "$0"]),
      theme: 'striped',
      styles: {
        cellPadding: 5,
        fontSize: 11,
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
  
    doc.setLineWidth(0.5);
    doc.line(15, posY + 10, 195, posY + 10);
  
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for your purchase!", 105, posY + 20, { align: "center" });
    doc.text("If you have any questions, please do not hesitate to contact us", 105, posY + 26, { align: "center" });
  
    doc.save("Receipt-" + details.id + ".pdf");
  }
}
