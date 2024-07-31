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
  department: any = "Ahuachapán";
  municipality: any = "Ahuachapán"; 
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
    this.clientInfo();

    if(this.cartService.getItems().length === 0) {
      window.location.href = "/";
    }

    $("#homeShipping").on("click", () => {
      $("#homeShippingCol1, #homeShippingCol2").removeClass("d-none");
      $("#pickAtStoreSpace").addClass("d-none");
      $("#pickAtStore").addClass('btn-outline-primary').removeClass("btn-primary");
      $("#homeShipping").removeClass('btn-outline-primary').addClass("btn-primary");
      
      $("#clientAddress").val("");
      $("#referencePoint").val("");

      $("#floatingSelectDepartments").on("change", () => {
        this.departmentId = parseInt($("#floatingSelectDepartments").val() as string);
        this.getMunicipalities(this.departmentId);
        this.department = this.departments[parseInt($("#floatingSelectDepartments").val() as string)].nombre;
      });
  
      $("#floatingSelectMunicipalities").on("change", () => {
        this.municipality = $("#floatingSelectMunicipalities").val();
      });
      
      this.cartService.amount = 2.95;
    });

    $("#pickAtStore").on("click", () => {
      $("#homeShippingCol1, #homeShippingCol2").addClass("d-none");
      $("#pickAtStoreSpace").removeClass("d-none");
      $("#message").html("Excelent! <br> Now you can go to our store to recieve your package");
      $("#pickAtStore").removeClass("btn-outline-primary").addClass("btn-primary");
      $("#homeShipping").addClass("btn-outline-primary").removeClass("btn-primary");

      $("#clientAddress").val("C.C. Plaza Merliot, 3 nivel local 308, Santa Tecla, La Libertad, El Salvador, Centro América");
      $("#referencePoint").val("Between Plaza Merliot Street and Rosa de Lima Street");
      this.department = "La Libertad";
      this.municipality = "Santa Tecla";
      this.cartService.amount = 0;
    });

    $('textarea').each(function() {
      const textarea: any = $(this);
      let maxLength = textarea.attr('maxlength');
      let charCount = $(`#remaining-${textarea.index('textarea') + 1}`);

      textarea.on('input', function() {
        let remaining = maxLength - textarea.val().length;
        charCount.text(`${remaining} / ${maxLength}`);
      });
    });
  }

  clientInfo() {
    $("#saveClientInfo").on("click", () => {
      let item: any = [];
      let clientName = $("#clientName").val();
      let clientEmail = $("#clientEmail").val();
      let clientPhone = $("#clientPhone").val();
      let additionalComments = $("#additionalComments").val();
      let clientAddress = $("#clientAddress").val();
      let referencePoint = $("#referencePoint").val();

      if(clientName !== "" && clientEmail !== "" && clientPhone !== "" && clientAddress !== "") {
        if(referencePoint === "") {
          referencePoint = "No reference point";
        }

        item.push({ clientName: clientName, clientEmail: clientEmail, department: this.department, municipality: this.municipality, clientPhone: clientPhone, additionalComments: additionalComments, clientAddress: clientAddress, referencePoint: referencePoint });

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
