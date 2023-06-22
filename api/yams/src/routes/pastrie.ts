import express, { Router, Request, Response } from "express";
import { PASTRIES as pastries } from "./../mocks";
import { Pastrie } from "./../pastrie";
import * as recipeController from "../controllers/recipeControllers";



const router: Router = express.Router();

// optimisation dans le comptage des pastries 
const COUNT : number = pastries.length;


//factoriser les responses 

function sendResponse(res: Response, data: any){
    if(data){
        res.json(data);
    }else{
        res.sendStatus(404)
        console.log("pastriestssendresponse")
    }
}

// all pastries
router.get("/pastries", function (req: Request, res: Response) {
    sendResponse(res, pastries);
    //res.json(pastries);
});

// id pastries
router.get("/pastrie/{id}", function (req: Request, res: Response) {
    const id: string = req.params.id
    const p: Pastrie | undefined = pastries.find(p => p.id == id);
    sendResponse(res, p)

    //if (p){res.json(p);}else{res.sendStatus(404);}
});

router.get("/pastries-search/:word", function (req: Request, res: Response) {
    const word: string = req.params.word;
    const re = new RegExp(word.trim(), 'i');

    // by quantity order 
    const p: Pastrie[] = pastries.filter(p => p.name.match(re));

    sendResponse(res,p);

});

/**
 * Exemple de récupération des données avec start et end dans l'url 
 * Dans l'exemple ci-dessous on récupère deux pastries 
 * api/pastries/0/2
 */
router.get("/pastries/:start?/:end", function (req: Request, res: Response) {
    const start: string = req.params.start;
    const end: string = req.params.end;

    let p: Pastrie[] = end 
    ? pastries.slice(parseInt(start), parseInt(end) + 1) 
    : pastries.slice(parseInt(start))

  sendResponse(res, p)
});

// même requete mais ordonné
router.get("/pastries/order-quantity/:start?/:end", function (req: Request, res: Response) {
    const start: string = req.params.start;
    const end: string = req.params.end;

    // by quantity order 
    pastries.sort((a, b) => b.quantity - a.quantity)

    const p: Pastrie[] = end ? pastries.slice(parseInt(start), parseInt(end) + 1) : pastries.slice(parseInt(start))

    sendResponse(res, p)
});

// count number pastries 
router.get("/pastries-count", function (req: Request, res: Response) {
    res.json(COUNT);
});
//crud
router.post('/pastries', recipeController.createPastrie);
router.get('/pastries/:id', recipeController.getRecipe);
router.put('/pastries/:id', recipeController.updatePastrie);
router.delete('/pastries/:id', recipeController.deletePastrie);


router.get('*', function (req: Request, res: Response) {
    res.status(404).json({ error: "Not found / pastriets" })
});

export default router;