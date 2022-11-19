type props = {children: React.element}

@obj
external makeProps: (~children: React.element=?, unit) => props = ""

let make: React.component<props> = Obj.magic("boxGeometry")
