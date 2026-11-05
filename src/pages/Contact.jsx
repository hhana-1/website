import "./Contact.css";
import { useTheme } from "../context/ThemeContext";
import ContactForm from "../components/ContactForm";
function ContactPage() {
  const socialLinks = [
    { name: "github", url: "https://github.com/hhana-1" },
    { name: "instagram", url: "https://www.instagram.com/hanahulic/" },
    { name: "behance", url: "https://www.behance.net/hhana1a728" },
  ];
  const { theme } = useTheme();
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
  <div className={`contact-text ${theme}`}>
    <p > Hello and Welcome to my corner of the Internet.
    </p>
    <p>I'm a full-stack developer focused on software architecture, resilient event-driven systems, and clean system boundaries. Specializing in scaling applications and integrating AI infrastructure (LLMs, tokenization, encoding).</p>
    <p>I speak English, French, Serbian, Bosnian, Croatian, Montenegrin and Dutch.</p>
     <p>Need a website? Write me a message.</p>
    <p>There's a Contact format the bottom of the page.</p>
    <p>My active hobbies are tango, salsa, rollerblading, embroidery, chess. Regarding passive hobbies those are watching Youtube videos, and random TV shows like Family Dad at the moment. </p>

</div>

    <ContactForm />
          </div>
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
  );
}

export default ContactPage;
