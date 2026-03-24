import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const Title = styled.h1`
  color: #6C5B7B;
  font-family: 'Playfair Display', serif;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Content = styled.div`
  font-family: 'Open Sans', sans-serif;
  color: #333;
  line-height: 1.8;
  font-size: 1.1rem;

  p {
    margin-bottom: 1.5rem;
  }
`;

const About = () => {
  return (
    <Container>
      <Title>About Us - החזון היזמי שלנו</Title>
      <Content>
        <p>
          ברוכים הבאים ל-<strong>Moda</strong>! הפרויקט הזה נולד מתוך חזון יזמי חזק ליצור חוויית קניות מושלמת, המשלבת טכנולוגיה מתקדמת ואהבה לאופנה.
        </p>
        <p>
          כיזמים, זיהינו צורך בפלטפורמה מהירה, מאובטחת ומעוצבת היטב שתחבר בין הלקוחות לבין המוצרים בקלות. האתגר היה לבנות מערכת E-Commerce שלמה מאפס, המטפלת בו-זמנית בניהול משתמשים, קטלוג חכם, עגלת קניות בזמן אמת ותהליכי תשלום מורכבים. 
        </p>
        <p>
          בעזרת שימוש בכלים החדשניים ביותר בתעשייה (כגון React, Tailwind ו-Node.js), הצלחנו להפוך את הרעיון למוצר מוגמר שמעניק למשתמשים חוויה חלקה ונעימה - החל משלב החיפוש ועד לתשלום המאובטח בקופה. המטרה שלנו היא לא רק למכור בגדים, אלא להוכיח שעם חזון ברור ויכולות פיתוח גבוהות וכוח רצון, אפשר להפוך כל רעיון למציאות דיגיטלית חיה ובועטת.
        </p>
      </Content>
    </Container>
  );
};

export default About;
