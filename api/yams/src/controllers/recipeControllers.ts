import { Request, Response } from 'express';
import { Pastrie } from '../pastrie';
import { PASTRIES } from '../mocks';

let recipes : Pastrie[]= PASTRIES; //tableau pour stocker mes pastries
const { v4: uuidv4 } = require('uuid');

//CREATE 

export const createPastrie = (req: Request,res: Response)=> {
    
    const{ ref, name, description,quantity, order, like, tags} = req.body;

    //nouveau objet
   const newRecipe ={
        id : uuidv4(), // trouver une methode> librairie uuid?
        ref,
        name,
        description,
        quantity,
        order,
        like,
        tags,
    };
    recipes.push(newRecipe);
    res.status(201).json(newRecipe); // status 201 = create
}

//UPDATE
 //séléctionner par id => s'il existe alors on le modifie sinon 404
 export const getRecipe = (req: Request, res: Response) => {
    const recipeId = req.params.id;
  
    // Rechercher la pastrie/recette dans le tableau en fonction de son ID
    const recipe = recipes.find((recipe) => recipe.id === recipeId);
  
    if (!recipe) {
      res.status(404).json({ error: 'Recette non trouvée' });
    } else {
      res.status(200).json(recipe);
    }
  };
  
  // Mettre à jour une recette
  export const updatePastrie = (req: Request, res: Response) => {
    const recipeId = req.params.id;
    const { ref, name, description, quantity, order, like, tags } = req.body;
  
    // Rechercher la recette dans le tableau des recettes en fonction de son ID
    const recipe = recipes.find((recipe) => recipe.id === recipeId);
  
    if (!recipe) {
      res.status(404).json({ error: 'Recette non trouvée' });
    } else {
      // Mettre à jour les propriétés de la recette avec les nouvelles valeurs
      recipe.ref = ref;
      recipe.name = name;
      recipe.description = description;
      recipe.quantity = quantity;
      recipe.order = order;
      recipe.like = like;
      recipe.tags = tags;
  
      res.status(200).json(recipe);
    }
  };
  
  // Supprimer une recette
  export const deletePastrie = (req: Request, res: Response) => {
    const recipeId = req.params.id;
  
    // Rechercher l'index de la recette dans le tableau des recettes en fonction de son ID
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === recipeId);
  
    if (recipeIndex === -1) {
      res.status(404).json({ error: 'Recette non trouvée' });
    } else {
      // Supprimer la recette du tableau des recettes
      recipes.splice(recipeIndex, 1);
  
      res.status(204).send(); // Réponse 204 pour indiquer que la recette a été supprimée avec succès
    }
  };

export default { createPastrie, getRecipe, updatePastrie, deletePastrie };