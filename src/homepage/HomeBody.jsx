const HomeBody = () => {
    return (
        <div className="home-body-container">
            <div className="carousel">
                <div className="group">
                    <div className="card">Pawned</div>
                    <div className="card">From Pawn to King</div>
                    <div className="card">Pawnedora</div>
                    <div className="card">From Pawn to Queen</div>
                    <div className="card">Earned, not given</div>
                </div>
                <div className="group">
                    <div className="card">Pawned</div>
                    <div className="card">From Pawn to King</div>
                    <div className="card">Pawnedora</div>
                    <div className="card">From Pawn to Queen</div>
                    <div className="card">Earned, not given</div>
                </div>
            </div>

             <div className="manifesto">
                <p className="manifesto-heading">the manifesto</p>
                <h1>Every King, was once <br/><span>a Pawn</span></h1>
                <p className="manifesto-text">PAWNED is not just a brand. It is a movement. Built for those who started at the bottom of the board and moved with purpose, strategy, and relentless will. Every stitch is a step. Every piece earned. From Pawn to King. From Pawn to Queen.</p>
             </div>

        </div>
    )
}

export default HomeBody;