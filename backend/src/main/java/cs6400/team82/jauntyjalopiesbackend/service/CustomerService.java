package cs6400.team82.jauntyjalopiesbackend.service;

import cs6400.team82.jauntyjalopiesbackend.dao.BusinessCustomerDAO;
import cs6400.team82.jauntyjalopiesbackend.dao.IndividualCustomerDAO;
import cs6400.team82.jauntyjalopiesbackend.model.BusinessCustomer;
import cs6400.team82.jauntyjalopiesbackend.model.IndividualCustomer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    private BusinessCustomerDAO businessCustomerDAO;
    @Autowired
    private IndividualCustomerDAO individualCustomerDAO;

    public IndividualCustomer getIndividualCustomerById(String id) {
        return individualCustomerDAO.getByDriverLicense(id);
    }

    public BusinessCustomer getBusinessCustomerById(String id) {
        return businessCustomerDAO.getByTin(id);
    }


    public void createIndividualCustomer(IndividualCustomer customer) {
        individualCustomerDAO.createIndividualCustomer(customer);
    }

    public void createBusinessCustomer(BusinessCustomer customer) {
        businessCustomerDAO.createBusinessCustomer(customer);
    }
}
