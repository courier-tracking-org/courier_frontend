import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { getAllParcels, createParcel, getParcelById, updateParcel, deleteParcel } from './parcelService';

vi.mock('axios', () => {
  return {
    default: {
      create: vi.fn().mockReturnThis(),
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    },
  };
});

describe('parcelService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAllParcels returns data on success', async () => {
    const mockData = [{ id: 1, name: 'Parcel 1' }];
    axios.get.mockResolvedValueOnce({ data: mockData });
    
    const result = await getAllParcels();
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('/api/parcels');
  });

  it('createParcel posts data and returns response', async () => {
    const parcelData = { recipient: 'John' };
    const mockResponse = { id: 1, ...parcelData };
    axios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await createParcel(parcelData);
    expect(result).toEqual(mockResponse);
    expect(axios.post).toHaveBeenCalledWith('/api/parcels', parcelData);
  });

  it('getParcelById returns specific parcel', async () => {
    const mockData = { id: 1, name: 'Parcel 1' };
    axios.get.mockResolvedValueOnce({ data: mockData });

    const result = await getParcelById(1);
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('/api/parcels/1');
  });

  it('updateParcel puts data and returns response', async () => {
    const parcelData = { recipient: 'Jane' };
    const mockResponse = { id: 1, ...parcelData };
    axios.put.mockResolvedValueOnce({ data: mockResponse });

    const result = await updateParcel(1, parcelData);
    expect(result).toEqual(mockResponse);
    expect(axios.put).toHaveBeenCalledWith('/api/parcels/1', parcelData);
  });

  it('deleteParcel calls delete endpoint', async () => {
    axios.delete.mockResolvedValueOnce({});

    await deleteParcel(1);
    expect(axios.delete).toHaveBeenCalledWith('/api/parcels/1');
  });

  it('getAllParcels throws error on failure', async () => {
    const error = new Error('Network error');
    axios.get.mockRejectedValueOnce(error);

    await expect(getAllParcels()).rejects.toThrow('Network error');
  });
});
