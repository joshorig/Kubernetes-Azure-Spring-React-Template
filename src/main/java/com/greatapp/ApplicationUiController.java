package com.greatapp;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/*
 * This is a tricky hook to map all react app browser rooting to the start page.
 *
 * In case if you have several apps (with react), then please put
 * the logic to the `index` method and analyze `HttpServletRequest request`
 * argument's url in order to understand what exact index.html you need to map
 */
@Controller
public class ApplicationUiController implements ErrorController {

    private static final String PATH = "/error";

    @Override
    public String getErrorPath() {
        return PATH;
    }

    @RequestMapping(value = {"/", PATH})
    public String index() {
        return "index.html";
    }
}
