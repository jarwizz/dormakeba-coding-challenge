import { BuildingDto } from '@/__mocks__/dtos/BuidlingDto';
import { DoorDto } from '@/__mocks__/dtos/DoorDto';
import { Door } from '@/models/Door';
import { DoorMapper } from './DoorMapper';
import { ApartmentDto } from '@/__mocks__/dtos/ApartmentDto';

const apartmentDto: ApartmentDto = {
  id: '8as7d68as6d8a7s6d9qw',
  building_id: '63f4e0797e85310fee059022',
  floor: 12,
  name: 'Luxury Apartment',
};

const buildingDto: BuildingDto = {
  id: '63f4e0797e85310fee059022',
  street: 'Bahnhofstrasse',
  street_no: '10A',
  zip: '8000',
  city: 'Zurich',
};

const doorDto: DoorDto = {
  id: '63f4d82ef04826419cc6eaeb',
  name: 'Building Main Entrance',
  connection_type: 'wired',
  connection_status: 'online',
  last_connection_status_update: '2023-02-22T02:38:40.374Z',
  building_id: buildingDto.id,
  apartment_id: apartmentDto.id,
};

describe('DoorMapper', () => {
  let doorMapper: DoorMapper;

  beforeEach(() => {
    doorMapper = new DoorMapper();
  });

  it('should map dto to Door model', () => {
    const door = doorMapper.toDomain(
      doorDto,
      {
        [buildingDto.id]: buildingDto,
      },
      {
        [apartmentDto.id]: apartmentDto,
      },
    );

    expect(door).toMatchObject<Door>({
      id: doorDto.id,
      name: doorDto.name,
      buildingName: `${buildingDto.street} ${buildingDto.street_no}`,
      apartmentName: apartmentDto.name,
      connectionType: doorDto.connection_type,
      connectionStatus: doorDto.connection_status,
      lastConnectionStatusUpdate: doorDto.last_connection_status_update,
    });
  });

  it('should set building name and apartment name to "n/a" if no matching building is found', () => {
    const door = doorMapper.toDomain(doorDto, {});

    expect(door).toMatchObject<Door>({
      id: doorDto.id,
      name: doorDto.name,
      buildingName: 'n/a',
      apartmentName: 'n/a',
      connectionType: doorDto.connection_type,
      connectionStatus: doorDto.connection_status,
      lastConnectionStatusUpdate: doorDto.last_connection_status_update,
    });
  });
});
