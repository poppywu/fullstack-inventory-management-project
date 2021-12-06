package cs6400.team82.jauntyjalopiesbackend.controller;

import cs6400.team82.jauntyjalopiesbackend.model.*;
import cs6400.team82.jauntyjalopiesbackend.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
public class VehicleController {
    @Autowired
    private VehicleService vehicleService;

    @PostMapping(path = "/car")
    public ResponseEntity<String> createCar(@RequestBody Car car) {
        try {
            vehicleService.createCar(car);
            return new ResponseEntity<>("car created successfully", HttpStatus.CREATED);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>("can not create car", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/van")
    public ResponseEntity<String> createVan(@RequestBody Van van) {
        try {
            vehicleService.createVan(van);
            return new ResponseEntity<>("car created successfully", HttpStatus.CREATED);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>("can not create car", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/convertible")
    public ResponseEntity<String> createConvertible(@RequestBody Convertible convertible) {
        try {
            vehicleService.createConvertible(convertible);
            return new ResponseEntity<>("car created successfully", HttpStatus.CREATED);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>("can not create car", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping(path = "/suv")
    public ResponseEntity<String> createSUV(@RequestBody SUV suv) {
        try {
            vehicleService.createSUV(suv);
            return new ResponseEntity<>("car created successfully", HttpStatus.CREATED);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>("can not create car", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping(path = "/truck")
    public ResponseEntity<String> createTruck(@RequestBody Truck truck) {
        try {
            vehicleService.createTruck(truck);
            return new ResponseEntity<>("car created successfully", HttpStatus.CREATED);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>("can not create car", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/vehicles/{id}")
    public ResponseEntity<Object> getVehicleDetailByVin(@PathVariable("id") String vin) {
        try {
            return new ResponseEntity<>(vehicleService.getVehicleByVin(vin), HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/vehicles")
    public ResponseEntity<List<Vehicle>> getVehiclesByCriteria(@RequestParam(required = false) Integer modelYear, @RequestParam(required = false) String modelName, @RequestParam(required = false) String manufacturerName, @RequestParam(required = false) Double maxPrice, @RequestParam(required = false) String color, @RequestParam(required = false) String vehicleType, @RequestParam(required = false) String description, @RequestParam(required = false) Boolean sold, @RequestParam(required = false) String vin) {
        try {
            List<Vehicle> vehicles = vehicleService.getByCriteria(modelYear, modelName, manufacturerName, maxPrice, color, vehicleType, description, sold, vin);
            return new ResponseEntity<>(vehicles, HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/unsold-vehicle-count")
    public ResponseEntity<Integer> getUnsoldVehicleCount() {
        try {
            Integer result = vehicleService.getNumofUnsoldVehicle();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
