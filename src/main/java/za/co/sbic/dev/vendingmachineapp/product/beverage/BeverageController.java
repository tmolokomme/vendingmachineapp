package za.co.sbic.dev.vendingmachineapp.product.beverage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class BeverageController {

    private static final Logger logger = LoggerFactory.getLogger(BeverageController.class);

    @Autowired
    private BeverageService beverageSvc;

    //GET - ShortCurt Way
    @RequestMapping("/beverages")
    public List<Beverage> getAllBeverages() {
        logger.info("Retrieving all beverages....");
        return beverageSvc.getAllBeverages();
    }

    //GET
    @RequestMapping("/beverage/{id}")
    public Beverage getBeverage(@PathVariable long id) {
        logger.info("Retrieving beverage id: {0}", id);
        return beverageSvc.getBeverage(id);
    }

    //GET
    @RequestMapping("/beverage/deduct/{id}")
    public Beverage deductBeverage(@PathVariable long id) {
        logger.info("Buying beverage id: {0}", id);
        Beverage beverage = beverageSvc.getBeverage(id);
        if (beverage.getQuantity() > 0) {
            beverage.setQuantity((beverage.getQuantity() - 1));
            beverageSvc.updateBeverage(id, beverage);
        } else {
            throw new RuntimeException("Invalid Operation");
        }
        return beverage;
    }


    //PUT == Update
    /*
    @RequestMapping(method = RequestMethod.PUT, value="/beverage/{id}")
    public void updateBeverage(@PathVariable long id, @RequestBody Beverage beverage) {
        beverageSvc.updateBeverage(id, beverage);
    } */

    /*
    //POST == Create
    @RequestMapping(method = RequestMethod.POST, value="/beverages")
    public void addBeverage(@RequestBody Beverage beverage) {
        beverageSvc.addBeverage(beverage);
    }

    //DELETE == Delete
    @RequestMapping(method = RequestMethod.DELETE, value="/beverage/{id}")
    public void deleteBeverage(@PathVariable long id) {
        beverageSvc.deleteBeverage(id);
    }
    */

}
