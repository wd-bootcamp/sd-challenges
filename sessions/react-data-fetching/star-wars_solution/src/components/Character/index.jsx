import useSWR from "swr";
import Card from "../Card";

export default function Character({ id }) {
  const URL = `https://swapi.py4e.com/api/people/${id}`;

  const { data: character, error, isLoading } = useSWR(URL);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Card
      id={id}
      name={character.name}
      height={character.height}
      eyeColor={character.eye_color}
      birthYear={character.birth_year}
    />
  );
}
