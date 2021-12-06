package cs6400.team82.jauntyjalopiesbackend.controller;

import cs6400.team82.jauntyjalopiesbackend.model.BusinessCustomer;
import cs6400.team82.jauntyjalopiesbackend.model.IndividualCustomer;
import cs6400.team82.jauntyjalopiesbackend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping(path = "/i-customers")
    public ResponseEntity<String> addIndividualCustomer(@RequestBody IndividualCustomer individualCustomer) {
        try {
            customerService.createIndividualCustomer(individualCustomer);
            return new ResponseEntity<>("Individual customer created successfully.", HttpStatus.CREATED);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>("Error creating individual customer", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping(path = "/i-customers/{id}")
    public ResponseEntity<IndividualCustomer> getIndividualCustomer(@PathVariable("id") String dl) {
        try {
            IndividualCustomer customer = customerService.getIndividualCustomerById(dl);
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(path = "/b-customers")
    public ResponseEntity<String> addBusinessCustomer(@RequestBody BusinessCustomer businessCustomer) {
        try {
            customerService.createBusinessCustomer(businessCustomer);
            return new ResponseEntity<>("business customer created successfully", HttpStatus.CREATED);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>("can not create business customer", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/b-customers/{id}")
    public ResponseEntity<BusinessCustomer> getBusinessCustomer(@PathVariable("id") String id) {
        try {
            BusinessCustomer businessCustomer = customerService.getBusinessCustomerById(id);
            return new ResponseEntity<>(businessCustomer, HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
