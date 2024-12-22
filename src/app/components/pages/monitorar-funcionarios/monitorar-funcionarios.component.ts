import { LatLngBoundsLiteral } from 'leaflet';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { latLng, tileLayer, Map, Marker, Icon } from 'leaflet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monitorar-funcionarios',
  templateUrl: './monitorar-funcionarios.component.html',
  styleUrls: ['./monitorar-funcionarios.component.css'],
  imports: [CommonModule]
})
export class MonitorarFuncionariosComponent implements OnInit, AfterViewInit {
  funcionarios: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  funcionariosPorPagina: number = 4;
  map!: Map;
  markers: Marker[] = []; // Para manter os marcadores na memória

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
    zoom: 13,
    center: latLng(51.505, -0.09), // Posição inicial no mapa
  };

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchFuncionarios(this.currentPage);
  }

  ngAfterViewInit() {
    // Inicializa o mapa apenas uma vez
    this.map = new Map('map', {
      center: latLng(51.505, -0.09), // Posição inicial
      zoom: 13,
    });

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  fetchFuncionarios(page: number) {
    this.httpClient.get(`http://localhost:8091/api/funcionarios/consultar?page=${page}`).subscribe((data: any) => {
      this.funcionarios = data.funcionarios;
      this.totalPages = Math.ceil(data.total / this.funcionariosPorPagina); // Supondo que a API retorne o total de funcionários
      this.updateMap();
    });
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchFuncionarios(page);
    }
  }


  updateMap() {
    // Limpar os marcadores existentes
    if (this.markers.length > 0) {
      this.markers.forEach(marker => marker.remove());
      this.markers = [];
    }
  
    // Adicionar novos marcadores
    this.funcionarios.forEach(funcionario => {
      if (funcionario.localizacao) {
        const { latitude, longitude } = funcionario.localizacao;
        const marker = new Marker([latitude, longitude], {
          icon: new Icon({
            iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          }),
        });
  
        marker.bindPopup(`<b>${funcionario.nome}</b><br>Latitude: ${latitude}<br>Longitude: ${longitude}`);
        marker.addTo(this.map);
        this.markers.push(marker); // Adiciona à lista de marcadores
      }
    });
  
    // Ajusta o centro do mapa para a área com marcadores
    if (this.funcionarios.length > 0) {
      const latitudes = this.funcionarios.map(func => func.localizacao.latitude);
      const longitudes = this.funcionarios.map(func => func.localizacao.longitude);
  
      // Crie o bounds de forma adequada
      const bounds: LatLngBoundsLiteral = [
        [Math.min(...latitudes), Math.min(...longitudes)],
        [Math.max(...latitudes), Math.max(...longitudes)],
      ];
  
      this.map.fitBounds(bounds); // Ajusta o mapa para cobrir os marcadores
    }
  }
  
}
