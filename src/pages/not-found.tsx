import { Flex, Section } from "layout";
import { Button, TextSubtitle, TextTitleHero, TextTitlePage } from "primitives";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Section padding="1600">
      <Flex
        container
        direction="column"
        alignPrimary="center"
        alignSecondary="center"
        gap="600"
      >
        <TextTitleHero>404</TextTitleHero>
        <TextTitlePage>Page not found</TextTitlePage>
        <TextSubtitle>
          The page you're looking for doesn't exist yet.
        </TextSubtitle>
        <Button variant="neutral" onPress={() => navigate("/")}>
          Back to home
        </Button>
      </Flex>
    </Section>
  );
}
