import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faShippingFast, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { OrderInfoComponent } from "../order-info/order-info.component";
import { PayStepsService } from '../../services/pay-steps.service';
import { CartService } from '../../services/cart.service';
import $ from 'jquery';

interface Municipalities {
  municipios: [{
    id_mun: string,
    nombre: string
  }]
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

    $('#homeShipping').on('click', () => {
      $('#homeShippingCol1, #homeShippingCol2').removeClass('d-none');
      $('#pickAtStore').addClass('btn-outline-primary').removeClass('btn-primary');
      $('#homeShipping').removeClass('btn-outline-primary').addClass('btn-primary');
    });

    $('#pickAtStore').on('click', () => {
      $('#homeShippingCol1, #homeShippingCol2').addClass('d-none');
      $('#pickAtStore').removeClass('btn-outline-primary').addClass('btn-primary');
      $('#homeShipping').addClass('btn-outline-primary').removeClass('btn-primary');
      this.cartService.shippingCost(0);
    });

    $('#floatingSelectDepartments').on('change', () => {
      let departmentId: number = parseInt($('#floatingSelectDepartments').val() as string) || 0;
      this.getMunicipalities(departmentId);
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
        console.log(this.departments);
      });
  }

  async getMunicipalities(departmentId: number)  {
    console.log("selección departamento: ", departmentId);
    fetch(`https://api.npoint.io/75a81381a83b8f51e22d/departamentos/${departmentId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error to get municipalities');
      }
      return response.json();
    })
    .then((data: Municipalities[]) => {
      this.municipalities = data;
      console.log(this.municipalities);
    });
  }
}
