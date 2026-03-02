# How to execute playwright Tests.
    Find all page object files and all the playwright web tests in playwright folder. for configuraion like projects, headless mode,Environment specific urls,refer /config/playwrightConfig.json file.
    npm run playwright:test-web:dev - To run in dev environment
    npm run playwright:test-web:dev:webkit- To run in dev env with safari
    npm run playwright:test-web:dev:all - Run in all browsers
    npm run playwright:test-web:dev:chrome- Run in chrome
    npm run playwright:test-web:dev:firefox - Run in firefox 
    npm run playwright:test-web:dev:edge - Run in edge
    
    NOTE- before running playwright tests on edge browser, Please Install edge browser using the below command 

      npx playwright install msedge     

  # How to execute Wdio Mobile Tests.    
    npm run test:android - Run for android locally
    npm run test:ios - Run for ios locally
    Before Running android , ios tests on real device/simulator , Do not forget to configure android and ios capabilities in /config/androidCapabilities.json and /config/iosCapabilities.json files. To change android appPackage and ios bundle id,refer .env file in the project root.

   
  # How to Generate Allure Report once the execution is complete
    Generate - allure generate allure-results --clean --output ./allure-report
    open -  allure open ./allure-report   




    
  



