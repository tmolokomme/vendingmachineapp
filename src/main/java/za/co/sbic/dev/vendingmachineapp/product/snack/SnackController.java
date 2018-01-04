package za.co.sbic.dev.vendingmachineapp.product.snack;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/snack")
public class SnackController {
    @RequestMapping(value = "/snacks", method = RequestMethod.GET)
    public String snacks(Model model) {
        model.addAttribute("title", "Vending Machine - Snacks");
        return "snacks";
    }
}
