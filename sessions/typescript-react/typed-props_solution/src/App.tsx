import type { ReactNode } from "react";
import "./styles.css";

type GreetingProps = {
  name: string;
  age?: number;
};

function Greeting({ name, age }: GreetingProps) {
  return (
    <p>
      Hello {name}
      {age !== undefined && `, you are ${age} years old`}!
    </p>
  );
}

type BadgeProps = {
  label: string;
  color: "green" | "red" | "blue";
};

function Badge({ label, color }: BadgeProps) {
  return <span className={`badge badge-${color}`}>{label}</span>;
}

type CardProps = {
  title: string;
  children: ReactNode;
};

function Card({ title, children }: CardProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

type LikeButtonProps = {
  isLiked: boolean;
  onToggle: () => void;
};

function LikeButton({ isLiked, onToggle }: LikeButtonProps) {
  return <button onClick={onToggle}>{isLiked ? "❤️" : "🤍"}</button>;
}

export default function App() {
  function handleToggle() {
    console.log("toggled");
  }

  return (
    <main>
      <Greeting name="Alex" />
      <Greeting name="Sam" age={28} />
      <Badge label="New" color="green" />
      <Card title="Favourite">
        <LikeButton isLiked={true} onToggle={handleToggle} />
      </Card>

      {/* Step 5: These lines were errors after typing:
          - name={42}: Type 'number' is not assignable to type 'string'.
          - color="yellow": Type '"yellow"' is not assignable to type '"green" | "red" | "blue"'.
          - isLiked="yes" and missing onToggle: wrong type and missing required prop.
          They are fixed here. */}
      <Greeting name="42" />
      <Badge label="Sale" color="red" />
      <LikeButton isLiked={false} onToggle={handleToggle} />
    </main>
  );
}
