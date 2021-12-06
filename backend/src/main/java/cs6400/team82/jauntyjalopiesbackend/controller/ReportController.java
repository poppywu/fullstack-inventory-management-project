package cs6400.team82.jauntyjalopiesbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import cs6400.team82.jauntyjalopiesbackend.service.ReportService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping(path = "/reports")
    public ResponseEntity<List<List<Map<String, Object>>>> getReport() {
        try {
            List<List<Map<String, Object>>> result = new ArrayList<>();
            result.add(reportService.getColorSale());
            result.add(reportService.getTypeSale());
            result.add(reportService.getManufacturerSale());
            result.add(reportService.getGrossCustomerIncome());
            result.add(reportService.getAverageTimeInInventory());
            result.add(reportService.getManufacturerRepair());
            result.add(reportService.getCostBelowSale());
            result.add(reportService.getPartStatistics());
            result.add(reportService.getMonthlySale());
            return new ResponseEntity<List<List<Map<String, Object>>>>(result, HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/reports/customer-sale")
    public ResponseEntity<List<Map<String, Object>>> getTopCustomerSaleDrillDown(@RequestBody Map<String, String> customerIDMap) {
        try {
            String customerID = customerIDMap.get("customerID");
            return new ResponseEntity<>(reportService.getTopCustomerSaleDrillDown(customerID), HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/reports/customer-repair")
    public ResponseEntity<List<Map<String, Object>>> getTopCustomerRepairDrillDown(@RequestBody Map<String, String> customerIDMap) {
        try {
            String customerID = customerIDMap.get("customerID");
            return new ResponseEntity<>(reportService.getTopCustomerRepairDrillDown(customerID), HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/reports/monthly-sale")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyDrillDown(@RequestBody Map<String, String> monthMap) {
        try {
            String month = monthMap.get("month");
            return new ResponseEntity<>(reportService.getMonthlySaleDrillDown(month), HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/reports/manufacturer-repair")
    public ResponseEntity<List<Map<String, Object>>> getManufacturerRepairDrillDown(@RequestBody Map<String, String> manufacturerIDMap) {
        try {
            String manufacturerID = manufacturerIDMap.get("manufacturerID");
            return new ResponseEntity<>(reportService.getManufacturerRepairDrillDrown(manufacturerID), HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/reports/manufacturer-type-repair")
    ResponseEntity<List<Map<String, Object>>> getManufacturerAndTypeRepairDrillDown(@RequestBody Map<String, String> manufacturerIDAndTypePayload) {
        try {
            String manufacturerID = manufacturerIDAndTypePayload.get("manufacturerID");
            String vehicleType = manufacturerIDAndTypePayload.get("vehicleType");
            return new ResponseEntity<>(reportService.getManufacturerAndTypeRepairDrillDown(manufacturerID, vehicleType), HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
