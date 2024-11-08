import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter,faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Import X (Twitter) icon

const Footer = () => {
    return (
<footer className="bg-gradient-to-r from-purple-800 via-orange-200 to-green-500 py-6 mt-8">
<div className="container mx-auto text-center ">
                <p>&copy; {new Date().getFullYear()} Event Manager. All rights reserved.</p>

                {/* Social media icons */}
                <div className="mt-4 flex justify-center space-x-6">
                    <a href="https://www.linkedin.com/in/r-s-lora-20343a245/" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] hover:text-white transition duration-300">
                        <FontAwesomeIcon icon={faLinkedin} size="2x" />
                    </a>
                    <a href="https://github.com/LORA-2000" target="_blank" rel="noopener noreferrer" className="text-[#181717] hover:text-white transition duration-300">
                        <FontAwesomeIcon icon={faGithub} size="2x" />
                    </a>
                    <a href="https://wa.me/9439174879" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:text-white transition duration-300">
                        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                    </a>
                    <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" className="text-[#0b0e11] hover:text-white transition duration-300">
                        <FontAwesomeIcon icon={faXTwitter} size="2x" />
                    </a>

                </div>

                {/* Optional: Copyright text */}
                <p className="mt-2 text-sm text-gray-800">
                    Created with ❤️🌈🦋
                </p>
            </div>
        </footer>
    );
};

export default Footer;
