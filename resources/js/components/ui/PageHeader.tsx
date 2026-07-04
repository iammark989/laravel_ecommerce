interface BackCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export default function BackCard({
    title,
    description,
    children,
}: BackCardProps) {

    return (

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            {title}
                        </h1>

                        <p className="text-gray-500">
                            {description}
                        </p>
                    </div>

                    
                        
                {children}

                
  

         </div>

      
           
           
            
  

    );

}