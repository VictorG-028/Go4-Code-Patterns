import Controller from "./Controller";


interface Middleware extends Controller {
  controller: Controller; // Decorated controller
}

export default Middleware;
