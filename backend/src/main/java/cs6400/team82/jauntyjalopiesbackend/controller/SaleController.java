package cs6400.team82.jauntyjalopiesbackend.controller;

import cs6400.team82.jauntyjalopiesbackend.model.Sale;
import cs6400.team82.jauntyjalopiesbackend.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
public class SaleController {
    @Autowired
    private SaleService saleService;

    @PostMapping(path = "/sale")
    public ResponseEntity<String> createSale(@RequestBody Sale sale) {
        try {
            saleService.createSale(sale);
            return new ResponseEntity<>("sale created successfully", HttpStatus.CREATED);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>("can not create sale", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/sale/{id}")
    public ResponseEntity<List<Map<String, Object>>> getSaleDetailByVin(@PathVariable("id") String vin) {
        try {
            return new ResponseEntity<List<Map<String, Object>>>(saleService.getSaleDetailByVin(vin), HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
