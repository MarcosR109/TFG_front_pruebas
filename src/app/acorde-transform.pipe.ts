import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acordeTransform',
})
export class AcordeTransformPipe implements PipeTransform {
  transform(tonalidades: any, tonalidad: string, acordeId: number): string {
    const acorde = tonalidades[tonalidad]?.find(
      (a: { id: number }) => a.id === acordeId
    );
    return acorde ? acorde.acorde : '';
  }
}
