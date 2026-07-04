interface BackCardProps {
    children: React.ReactNode;
}

export default function BackCard({
    children,
}: BackCardProps) {

    return (

      
           
           
            <div className="flex items-center gap-2 border px-4 py-2 rounded-xl bg-white hover:bg-slate-100">
                        
                {children}

            </div>

  

    );

}