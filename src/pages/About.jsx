import ContentWrapper from '../components/ContentWrapper';

function About({ reference }) {
  return (
    <section ref={reference} id="about">
      <ContentWrapper headerText="About me">
        <p style={{ maxWidth: '60ch', textIndent: '2rem' }}>
          Hi, I am Prasanna. I&apos;ve stepped into programming world from
          coding small bots for fun and started enjoying making things that
          dwell on virtual world of computers while having their impact on our
          world. Learnt data structures to make the process smoother and faster.
        </p>
        <p style={{ maxWidth: '60ch', textIndent: '2rem', marginTop: '1ch' }}>
          Fast-forward to today, I am working as a software engineer, building
          highly scalable cross platform front-end products at a Fintech
          startup. Currently i am focusing on building easily understandable
          code bases with good coding practices without compromising the
          performance and appearance of the product.
        </p>
      </ContentWrapper>
    </section>
  );
}

export default About;
