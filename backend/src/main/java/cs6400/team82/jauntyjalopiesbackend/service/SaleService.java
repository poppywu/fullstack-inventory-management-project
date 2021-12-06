package cs6400.team82.jauntyjalopiesbackend.service;

import cs6400.team82.jauntyjalopiesbackend.dao.SaleDAO;
import cs6400.team82.jauntyjalopiesbackend.dao.VehicleDAO;
import cs6400.team82.jauntyjalopiesbackend.model.Sale;
import cs6400.team82.jauntyjalopiesbackend.model.Vehicle;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SaleService {
    @Autowired
    private SaleDAO saleDAO;
    @Autowired
    private VehicleDAO vehicleDAO;

    public void createSale(Sale sale) throws Exception {
        Vehicle vehicle = vehicleDAO.getByVin(sale.getVin());
        if (!sale.getUsername().equals("roland") && sale.getSoldPrice() <= vehicle.getInvoicePrice() * 0.95) {
            throw new Exception("Sold price is too low.");
        }
        else {
            saleDAO.createSale(sale);
        }
    }

    public List<Map<String, Object>> getSaleDetailByVin(String vin) {
        return saleDAO.getSaleDetailByVin(vin);
    }
}