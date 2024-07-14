import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faShippingFast, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { OrderInfoComponent } from "../order-info/order-info.component";
import { PayStepsService } from '../../services/pay-steps.service';
import { CartService } from '../../services/cart.service';
import $ from 'jquery';

interface Municipalities {
  id_mun: string,
  nombre: string,
  precio: number
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
  faUser = faUser;
  faShippingFast = faShippingFast;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  pay_steps = inject(PayStepsService);
  cartService = inject(CartService);

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
      let departmentId: number = parseInt($("#floatingSelectDepartments").val() as string) || 0;
      this.getMunicipalities(departmentId);
    });

    $("#floatingSelectMunicipalities").on("change", () => {
      this.cartService.amount = parseFloat($("#floatingSelectMunicipalities").val() as string);
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

  async getMunicipalities(departmentId: number) {
    fetch(`https://api.npoint.io/75a81381a83b8f51e22d/departamentos/${departmentId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error to get municipalities');
      }
      return response.json();
    })
    .then((data: any) => { // Use 'any' type here for simplicity; adjust as per your API response
      this.municipalities = data.municipios; // Assuming 'municipios' is the array of municipalities in your response
    });
  }
}
