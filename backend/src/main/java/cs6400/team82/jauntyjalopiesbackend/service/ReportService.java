package cs6400.team82.jauntyjalopiesbackend.service;

import cs6400.team82.jauntyjalopiesbackend.dao.ReportDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ReportService {
    @Autowired
    private ReportDAO reportDAO;

    public List<Map<String, Object>> getColorSale() {
        return reportDAO.getColorSale();
    }

    public List<Map<String, Object>> getTypeSale() {
        return reportDAO.getTypeSale();
    }

    public List<Map<String, Object>> getManufacturerSale() {
        return reportDAO.getManufacturerSale();
    }

    public List<Map<String, Object>> getGrossCustomerIncome() {
        return reportDAO.getGrossCustomerIncome();
    }

    public List<Map<String, Object>> getAverageTimeInInventory() {
        return reportDAO.getAverageTimeInInventory();
    }

    public List<Map<String, Object>> getTopCustomerSaleDrillDown(String customerID) {
        return reportDAO.getTopCustomerSaleDrillDown(customerID);
    }

    public List<Map<String, Object>> getTopCustomerRepairDrillDown(String customerID) {
        return reportDAO.getTopCustomerRepairDrillDown(customerID);
    }

    public List<Map<String, Object>> getManufacturerRepair() {
        return reportDAO.getManufacturerRepair();
    }

    public List<Map<String, Object>> getManufacturerRepairDrillDrown(String manufacturerID) {
        return reportDAO.getManufacturerRepairDrillDrown(manufacturerID);
    }

    public List<Map<String, Object>> getManufacturerAndTypeRepairDrillDown(String manufacturerID, String vehicleType) {
        return reportDAO.getManufacturerAndTypeRepairDrillDown(manufacturerID, vehicleType);
    }

    public List<Map<String, Object>> getCostBelowSale() {
        return reportDAO.getCostBelowSale();
    }

    public List<Map<String, Object>> getPartStatistics() {
        return reportDAO.getPartStatistics();
    }

    public List<Map<String, Object>> getMonthlySale() {
        return reportDAO.getMonthlySale();
    }

    public List<Map<String, Object>> getMonthlySaleDrillDown(String month) {
        return reportDAO.getMonthlySaleDrillDown(month);
    }
}
