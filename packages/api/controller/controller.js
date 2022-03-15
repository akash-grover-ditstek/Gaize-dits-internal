import organizationController from "./organization.controller";
import PaymentController from "./payment.controller";
import StripeController from "./stripe.controller";
import UserController from "./user.controller";

class Controller  {
    constructor(){
        this.user = new UserController(this);
        this.organization = new organizationController(this);
        this.stripe = new StripeController(this);
        this.payment = new PaymentController(this);

    }
}
export default new Controller()