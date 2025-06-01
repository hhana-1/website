import "./Contact.css";
function ContactPage() {
  const socialLinks = [
    { name: "github", url: "https://github.com/hhana-1" },
    { name: "instagram", url: "https://www.instagram.com/hanahulic/" },
    { name: "behance", url: "https://www.behance.net/hhana1a728" },
  ];
  return (
    <div className="container01">
       <h1>Contact</h1>
    <div className="contact-div">
     <div className="griddy-css">
    <img 
        className="hana-photo"
        src="/Arnhem075.jpg" 
        alt="Photo of Hana Hulic"
        style={{ 
          
         
        }} 
    />
      <div className='contact-right'>
  <div className='contact-text'>
    <p> Hello HELLO.
      Thank you for showing interest in my work.
      This here is me. Hana Hulic. The best way to contact me is by email.
      I've been everywhere and done everything. I also developed this website.
    </p>
    <p>Definitely want to write more code. Work on fonts. Research anatomy of flowers. Make a poster here or there, brochure & digital layout.</p>
    <p>I want to do more like more commercial work, more collaborations.</p>
        <p>I'm a big fan of reciprocity, fruit juice, grounding, sound of wawes, exciting activities, discovering new places, sea food, healthy deserts, comfy fits, thinking, salsa and tango dancing with non-creepy people, being healthy. I wouldn't mind making some music along the way.</p>
    <p>If you have a project that you think I would be a good fit for, do reach out. My interests are wide.
    
    I want to learn how to make a dashboard for a user to upload things on their website; aka more back and forth between front-end and back-end.
    I want to learn how to make a webshop and integrate payments. Send more data to databases using MongoDB.</p>
    <p>I speak English, French, Balkan languages aka Serbian, Bosnian, Croatian, Montenegrin.</p>


</div>


    <div className='social-icons-container'>
            {socialLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">
                <img
                className="social-icon"
                  src={`/social_icons/${link.name}.png`}
                  alt={`${link.name} icon`}
                />
              </a>
            ))}
          </div>
          </div>
    </div>
    </div>
    </div>
  );
}

export default ContactPage;
