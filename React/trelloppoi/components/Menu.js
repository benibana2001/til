export const recipeData = [
  {
    name: "Baked Salmon",
    ingredients: [
      { name: "Salmon", amount: 1, measurment: "l lb" },
      { name: "Pine Nuts", amount: 1, measurment: "cup" },
      { name: "Butter Lettuce", amount: 2, measurment: "cups" },
      { name: "Yellow Squash", amount: 1, measurment: "med" },
    ],
    steps: [
      "Preheat the oven to 350 degrees.",
      "Spread the olive oil around a glass baking dish.",
      "3. Spread the olive oil around a glass baking dish.",
      "5. Spread the olive oil around a glass baking dish.",
      "6. Spread the olive oil around a glass baking dish.",
    ],
  },
  {
    name: "Fish Tacos",
    ingredients: [
      { name: "Whitefish", amount: 1, measurment: "l lb" },
      { name: "Pine Nuts", amount: 1, measurment: "cup" },
      { name: "Butter Lettuce", amount: 2, measurment: "cups" },
      { name: "Yellow Squash", amount: 1, measurment: "med" },
    ],
    steps: [
      "Preheat the oven to 350 degrees.",
      "Spread the olive oil around a glass baking dish.",
      "3. Spread the olive oil around a glass baking dish.",
      "5. Spread the olive oil around a glass baking dish.",
      "6. Spread the olive oil around a glass baking dish.",
    ],
  },
];

export default function Menu({ recipes }) {
  return (
    <div className="recipes">
      {recipes.map((recipe, i) => (
        <Recipe key={i} {...recipe} />
      ))}
    </div>
  );
}

function Recipe({ name, ingredients, steps }) {
    return (
      <section id={name.toLowerCase().replace(/ /g, "-")}>
        <h2>{name}</h2>
        <ul className="ingredients">
          {ingredients.map((ingredient, i) => {
            <li key={i}>{ingredient.name}</li>;
          })}
        </ul>
        <section className="instructions">
          <h2>Cooking instructions</h2>
          {steps.map((step, i) => (
            <p key={i}>{step}</p>
          ))}
        </section>
      </section>
    );
  }