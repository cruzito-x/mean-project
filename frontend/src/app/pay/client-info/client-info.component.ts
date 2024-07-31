import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faCreditCard, faShoppingCart, faShippingFast, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { OrderInfoComponent } from "../order-info/order-info.component";
import { PayStepsService } from '../../services/pay-steps.service';
import { CartService } from '../../services/cart.service';
import $ from 'jquery';
import { ClientService } from '../../services/client.service';

interface Municipalities {
  id_mun: string,
  nombre: string,
  precio: number;
}

interface Departments {
  codigo: string;
  nombre: string;
};

@Component({
  selector: 'app-client-info',
  standalone: true,
  imports: [FontAwesomeModule, OrderInfoComponent],
  templateUrl: './client-info.component.html',
  styles: `
  textarea {
    height: 100px;
    resize: none;
  }
  `
})
export class ClientInfoComponent {
  departments: Departments[] = [];
  municipalities: Municipalities[] = [];
  clientAddress: string = "";
  referencePoint: string = "";
  departmentId: number = 0;
  department: any;
  municipality: any;
  faUser = faUser;
  faCreditCard = faCreditCard;
  faShoppingCart = faShoppingCart;
  faShippingFast = faShippingFast;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  pay_steps = inject(PayStepsService);
  cartService = inject(CartService);
  clientService = inject(ClientService);

  ngOnInit(): void {
    this.getDepartments();
    this.getMunicipalities(0);

    $("#homeShipping").on("click", () => {
      $("#homeShippingCol1, #homeShippingCol2").removeClass("d-none");
      $("#pickAtStoreSpace").addClass("d-none");
      $("#pickAtStore").addClass('btn-outline-primary').removeClass("btn-primary");
      $("#homeShipping").removeClass('btn-outline-primary').addClass("btn-primary");
    });

    $("#pickAtStore").on("click", () => {
      $("#homeShippingCol1, #homeShippingCol2").addClass("d-none");
      $("#pickAtStoreSpace").removeClass("d-none");
      $("#message").html("Excelent! <br> Now you can go to our store to recieve your package");
      $("#pickAtStore").removeClass("btn-outline-primary").addClass("btn-primary");
      $("#homeShipping").addClass("btn-outline-primary").removeClass("btn-primary");
    });

    $("#floatingSelectDepartments").on("change", () => {
      this.departmentId = parseInt($("#floatingSelectDepartments").val() as string);
      this.getMunicipalities(this.departmentId);
    });

    $("#floatingSelectMunicipalities").on("change", () => {
      this.cartService.amount = parseFloat($("#floatingSelectMunicipalities").val() as string);
    });

    $("#pickAtStore").click(() => {
      this.clientAddress = "C.C. Plaza Merliot, 3 nivel local 308, Santa Tecla, La Libertad, El Salvador, Centro América";
      this.referencePoint = "Between Plaza Merliot Street and Rosa de Lima Street";
      this.department = "";
      this.municipality = "";
      this.cartService.amount = 0;
    });

    $("#homeShipping").click(() => {
      this.department = this.departments[parseInt($("#floatingSelectDepartments").val() as string)].nombre;
      this.municipality = this.municipalities[parseInt($("#floatingSelectMunicipalities").val() as string)].nombre
      this.clientAddress = $("#clientAddress").val() as string;
      this.referencePoint = $("#referencePoint").val() as string;
    });

    $("#saveClientInfo").on("click", () => {
      let item: any = [];
      let clientName = $("#clientName").val();
      let clientEmail = $("#clientEmail").val();
      let clientPhone = $("#clientPhone").val();
      let additionalComments = $("#additionalComments").val();

      if(clientName !== "" && clientEmail !== "" && clientPhone !== "") {
        item.push({ clientName: clientName, clientEmail: clientEmail, department: this.department, municipality: this.municipality, clientPhone: clientPhone, additionalComments: additionalComments, clientAddress: this.clientAddress, referencePoint: this.referencePoint });

        if(this.clientService.getClientInfo().length === 0) {
          this.clientService.clientInfo(item);
        } else {
          localStorage.removeItem("clientInfo");
          this.clientService.clientInfo(item);
        }

        this.pay_steps.nextStep();
      }

      console.log(item);
    });
  }

  async getDepartments() {
    fetch('https://api.npoint.io/75a81381a83b8f51e22d/departamentos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error to get departments');
        }
        return response.json();
      })
      .then((data: Departments[]) => {
        this.departments = data;
      });
  }

  getMunicipalities(departmentId: number) {
    fetch(`https://api.npoint.io/75a81381a83b8f51e22d/departamentos/${departmentId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error to get municipalities');
      }
      return response.json();
    })
    .then((data: any) => {
      this.municipalities = data.municipios;
    });
  }
}
