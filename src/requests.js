const domain = "https://norma.nomoreparties.space";

export const requestIngredients = async () => {
  const ingredientResponse = await fetch(`${domain}/api/ingredients `);

  if (ingredientResponse.ok) {
    const ingredient = await ingredientResponse.json();
    return ingredient;
  }

  return Promise.reject(`Ошибка ${ingredientResponse.status}`);
};
