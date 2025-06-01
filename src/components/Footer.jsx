function Footer  () {
    return (
      <footer   style= {{
      position: "absolute",
      bottom: "0",
      width: "100%",
      height: "250px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    
    }}>
        <p>© 2025</p>
        <img src="/footer-pic/red-cherry-wiggle.svg" alt="Logo" 
        style={{ 
          width: "100%",
          position: "fixed",
          bottom: "0",

          }} />
      </footer> 
      );
}

export default Footer;