const domain = "https://norma.nomoreparties.space";

export const requestIngredients = async () => {
  try {
    const ingredientResponse = await fetch(`${domain}/api/ingredients `);
    const ingredient = await ingredientResponse.json();

    return ingredient;
  } catch {
    return [];
  }
};
