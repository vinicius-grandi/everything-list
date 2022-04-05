export default function getModelName(baseUrl: string) {
  const listName = baseUrl.slice(1);
  const modelName = listName.charAt(0).toUpperCase() + listName.slice(1, -1);
  return modelName;
}
