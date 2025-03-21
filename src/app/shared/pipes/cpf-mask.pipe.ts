import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfMask',
  standalone: true
})
export class CpfMaskPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    
    // Remove caracteres não numéricos
    const cpf = value.replace(/\D/g, '');
    
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      return value;
    }
    
    // Aplica a máscara: XXX.XXX.XXX-XX
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

}
