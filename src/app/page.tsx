"use client";
import React, { useEffect } from 'react';
const HomePage: React.FC = () => {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1
        };
        

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const contents = document.querySelectorAll('.content');
        contents.forEach(content => {
            observer.observe(content);
        });

        return () => {
            contents.forEach(content => {
                observer.unobserve(content);
            });
        };
    }, []);

    return (
        <div className="">
            

            <div className="content" style={{ ...styles.content, ...styles.transition }}>
                <div style={styles.description}>
                    <h1 style={styles.heading}>Welcome to Our Website</h1>
                    <p style={styles.paragraph}>
                        This is a simple website designed to provide you with the best
                        experience possible. Our goal is to offer valuable information
                        and services to our visitors. Explore our website to find out
                        more about what we have to offer.
                    </p>
                    <p style={styles.paragraph}>
                        This is a simple website designed to provide you with the best
                        experience possible. Our goal is to offer valuable information
                        and services to our visitors. Explore our website to find out
                        more about what we have to offer.
                    </p>
                </div>
                <div style={styles.imageContainer}>
                    <img
                        src="https://cdn.prod.website-files.com/5bc3ba13ca643a62b72ee828/657f93d9b452e23ec915559f_silent-auction.webp"
                        alt="Website Image"
                        style={styles.image}
                    />
                </div>
            </div>

            <div className="section content" style={{ ...styles.content, ...styles.transition }}>
                <div style={styles.imageContainer1}>
                    <img
                        src="https://www.bidnapper.com/wp-content/uploads/2023/10/undraw_savings_re_eq4w.svg"
                        alt="Another Image"
                        style={styles.image1}
                    />
                </div>
                <div style={styles.description1}>
                    <h1 style={styles.heading}>Our Services</h1>
                    <p style={styles.paragraph}>
                        We provide a wide range of services to meet your needs. Our
                        dedicated team is here to help you with any inquiries you may have.
                        Whether you're looking for advice or support, we're here to assist.
                        We provide a wide range of services to meet your needs. Our
                        dedicated team is here to help you with any inquiries you may have.
                        Whether you're looking for advice or support, we're here to assist.
                    </p>
                </div>
            </div>

            <div className="section content" style={{ ...styles.content, ...styles.transition }}>
                <div style={styles.description1}>
                    <h1 style={styles.heading}>About Us</h1>
                    <p style={styles.paragraph}>
                        Our company has been leading the industry for over a decade. We
                        pride ourselves on our commitment to quality and customer
                        satisfaction. Learn more about our journey and values.
                        Our company has been leading the industry for over a decade. We
                        pride ourselves on our commitment to quality and customer
                        satisfaction. Learn more about our journey and values.
                    </p>
                </div>
                <div style={styles.imageContainer1}>
                    <img
                        src="https://www.bidnapper.com/wp-content/uploads/2023/10/undraw_notify_re_65on.svg"
                        alt="About Image"
                        style={styles.image1}
                    />
                </div>
            </div>

            <div className="section content" style={{ ...styles.content, ...styles.transition }}>
                <div style={styles.imageContainer1}>
                    <img
                        src="https://www.bidnapper.com/wp-content/uploads/2023/10/undraw_real_time_sync_re_nky7.svg"
                        alt="Contact Image"
                        style={styles.image1}
                    />
                </div>
                <div style={styles.description1}>
                    <h1 style={styles.heading}>Accessible on all your devices</h1>
                    <p style={styles.paragraph}>
                        Whether you're a power user with 9 screens and 100's of auctions, or an occasional bidder sniping on the go, we've got you covered.
                        Whether you're a power user with 9 screens and 100's of auctions, or an occasional bidder sniping on the go, we've got you covered.
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#333',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingtop: '20px',
    },
    navbarImage: {
        height: '100px',
        width: '100px',
        marginRight: '20px',
    },
    navbarLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    navbarLink: {
        float: 'left' as 'left',
        display: 'block',
        color: '#f2f2f2',
        textAlign: 'center' as 'center',
        padding: '14px 20px',
        textDecoration: 'none',
    },
    navbarRight: {
        display: 'flex',
    },
    button: {
        backgroundColor: '#4CAF50',
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center' as 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
    },
    content: {
        display: 'flex',
        padding: '50px',
        paddingTop: '100px',
        paddingleft: '90px',
        opacity: 0,
        transition: 'opacity 1s, transform 1s',
    },
    description: {
        flex: 1,
        paddingRight: '300px',
        paddingTop: '60px',
        color: 'rgb(17, 139, 64)',
        
        fontSize: 'larger',
        transform: 'translateX(50px)',
    },
    heading: {
        fontSize: '50px',
        paddingLeft: '2px',
    },
    paragraph: {
        fontSize: '20px',
        paddingLeft: '10px',
    },
    imageContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'translateX(-50px)',
    },
    image: {
        maxWidth: '150%',
        paddingRight: '200px',
        width: '800px',
        height: '400px',
    },
    imageContainer1: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image1: {
        maxWidth: '100%',
        paddingLeft: '30px',
        paddingRight: '50px',
        width: '500px',
        height: '500px',
    },
    description1: {
        flex: 1,
        paddingRight: '300px',
        paddingTop: '60px',
        paddingLeft: '0.1rem',
        color: 'rgb(17, 139, 64)',
        fontSize: 'larger',
        transform: 'translateX(50px)',
    },
    transition: {
        opacity: 1,
        transform: 'translateX(6%)',
    }
};

export default HomePage;
