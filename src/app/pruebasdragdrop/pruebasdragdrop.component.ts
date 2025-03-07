import { Component, Directive, EventEmitter } from '@angular/core';
import { DndDropEvent, EffectAllowed } from 'ngx-drag-drop';
import { NgModule } from '@angular/core';
import { DndModule } from 'ngx-drag-drop';
import { CommonModule } from '@angular/common';
import { Acorde } from '../cancion/acorde';

@Component({
  selector: 'app-pruebasdragdrop',
  imports: [CommonModule, DndModule],
  templateUrl: './pruebasdragdrop.component.html',
  styleUrl: './pruebasdragdrop.component.css',
})
export class PruebasdragdropComponent {
  draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost
    data: 'myDragData',
    effectAllowed: 'all',
    disable: false,
    handle: false,
  };
}

export type DndDragImageOffsetFunction = (
  event: DragEvent,
  dragImage: Element
) => { x: number; y: number };
