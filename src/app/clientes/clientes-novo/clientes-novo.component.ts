import { formatCurrency, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/interfaces/cliente';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-clientes-novo',
  templateUrl: './clientes-novo.component.html',
  styleUrls: ['./clientes-novo.component.scss']
})
export class ClientesNovoComponent implements OnInit {

  form!: FormGroup;
  cliente: Cliente;
  pageSize = 5;
  currentPage = 1;
  message: any;

  constructor(
    private clienteService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public modalService: ModalService
  ) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      nomeCliente: new FormControl('', [Validators.required, this.nomeComSobrenomeValidator]),
      cpf: new FormControl('', [Validators.required, this.cpfValidator]),
      dataNascimento: new FormControl('', [Validators.required, this.idadeValidator]),
      rendaMensal: new FormControl(0, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dataCadastro: new FormControl({ disabled: true, value: formatDate(new Date(), 'dd/MM/yyyy HH:mm', 'pt-BR') }),
    });

    this.activatedRoute.params.subscribe(param => {
      if (param['id']) {
        this.clienteService.buscarClientePorId(param['id']).subscribe(cliente => {
          this.cliente = cliente;
          this.form.patchValue({
            ...cliente,
            rendaMensal: formatCurrency(cliente.rendaMensal, 'pt-BR', 'R$'),
            dataCadastro: formatDate(this.cliente.dataCadastro, 'dd/MM/yyyy HH:mm', 'pt-BR')
          });
          this.form.updateValueAndValidity();
          this.form.get('cpf')?.disable();
        });
      }
    });
  }

  cpfValidator(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value;

    if (!cpf) {
      return null;
    }

    const cpfNumerico = cpf.replace(/\D/g, '');
    console.log(cpfNumerico.length);
    if (cpfNumerico.length < 11) {
      return { cpfInvalido: true };
    }

    if (/^(\d)\1+$/.test(cpfNumerico)) {
      return { cpfInvalido: true };
    }

    const regexCPF = /^[0-9]{11}$/;

    if (!regexCPF.test(cpfNumerico)) {
      return { cpfInvalido: true };
    }
    return null;
  }

  nomeComSobrenomeValidator(control: AbstractControl): ValidationErrors | null {
    const nomeCompleto = control.value;

    const partesNome = nomeCompleto ? nomeCompleto.split(' ') : [];

    if (partesNome.length >= 2 && partesNome[1]) {
      return null;
    } else {
      return { nomeSemSobrenome: true };
    }
  }

  idadeValidator(control: AbstractControl): ValidationErrors | null {
    const dataNascimento = new Date(control.value);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimento.getFullYear();

    if (idade >= 18 && idade < 60) {
      return null;
    } else {
      return { idadeInvalida: true };
    }
  }

  resetarFormulario() {
    this.form.get('nomeCliente')?.setValue('');
    this.form.get('cpf')?.setValue('');
    this.form.get('dataNascimento')?.setValue('');
    this.form.get('rendaMensal')?.setValue(0);
    this.form.get('email')?.setValue('');
    this.form.get('dataCadastro')?.setValue(formatDate(new Date(), 'dd/MM/yyyy HH:mm', 'pt-BR'));
  }

  salvar() {
    if (this.cliente) {
      return this.editarCliente();
    } else {
      this.cadastrarCliente();
    }
  }

  cadastrarCliente() {
    const form = this.form.value;
    form.dataCadastro = new Date();

    this.clienteService.cadastrarCliente(form).subscribe({
      next: () => {
        this.modalService.openModal();
        // this.router.navigate(['/lista-de-clientes']);
      },
      error: () => {
        this.modalService.openModal();
      }
    });

  }

  editarCliente() {
    const form = this.form.value;
    form.cpf = this.cliente.cpf;
    console.log(form, formatCurrency(form.rendaMensal, 'pt-BR', ''));
    form.rendaMensal = form.rendaMensal ? Number(form.rendaMensal) : 0;
    form.dataCadastro = this.cliente.dataCadastro;

    this.clienteService.atualizarCliente(form, this.cliente?.id).subscribe({
      next: () => {
        // this.router.navigate(['/lista-de-clientes']);
        this.modalService.openModal();
        this.modalService.success = true;
        this.modalService.text = 'Cliente cadastrado com sucesso!'
      },
      error: () => {
        this.modalService.openModal();
        this.modalService.success = false;
        this.modalService.text = 'Erro ao cadastrar cliente!'
      }
    });
  }


}
