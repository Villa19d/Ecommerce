import Layout from "../../hocs/layout";
import '../../index.css';
import { useEffect } from "react";
import { connect } from 'react-redux';
import { 
    get_products_by_arrival, 
    get_products_by_sold 
} from '../../Redux/Actions/products';
import Banner from '../../components/home/Banner'
import ProductsArrival from '../../components/home/ProductsArrival'
import ProductsSold from '../../components/home/ProductsSold'
import FadeInScroll from '../../components/animations/FadeInScroll'
import InteractiveDarkBackground from '../../components/animations/InteractiveDarkBackground'

const Home = ({ 
    get_products_by_arrival, 
    get_products_by_sold,
    products_arrival,
    products_sold
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);

        get_products_by_arrival();
        get_products_by_sold();
    }, [get_products_by_arrival, get_products_by_sold]);

    return(
        <Layout>
            <InteractiveDarkBackground>
                <Banner/>
                <div className="py-16 space-y-16">
                    <FadeInScroll>
                        <ProductsArrival data={products_arrival}/>
                    </FadeInScroll>
                    
                    <FadeInScroll>
                        <ProductsSold data={products_sold}/>
                    </FadeInScroll>
                </div>
            </InteractiveDarkBackground>
        </Layout>
    )
}

const mapStateToProps = state => ({
    products_arrival: state.Products.products_arrival,
    products_sold: state.Products.products_sold,
})

export default connect(mapStateToProps, {
    get_products_by_arrival, 
    get_products_by_sold,
})(Home);