"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";
import type { Product } from "@/lib/types";

export function AdminDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  // Edit dialog state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/");
        const data = await res.json();
        setProducts(data);
      } catch {
        toast.error("Error", {
          description: "Failed to load products.",
        });
      }
    };

    fetchProducts();
  }, []);

  if (!user || user.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p>You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  const handleAddProduct = async () => {
    const missingFields: string[] = [];
    if (!newProduct.title) missingFields.push("Title");
    if (!newProduct.price) missingFields.push("Price");
    if (newProduct.price && isNaN(parseFloat(newProduct.price)))
      missingFields.push("Valid Price");

    if (missingFields.length > 0) {
      toast.error("Error", {
        description: `Please provide: ${missingFields.join(", ")}.`,
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newProduct.title,
          description: newProduct.description,
          price: parseFloat(newProduct.price),
          category: newProduct.category,
          image: newProduct.image,
        }),
      });

      if (!res.ok) throw new Error("Failed to create product");
      const product = await res.json();

      setProducts([product, ...products]);
      setNewProduct({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
      setIsAddDialogOpen(false);

      toast.success("Product added", {
        description: "New product has been added successfully.",
      });
    } catch {
      toast.error("Error", {
        description: "Could not add product.",
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Delete failed");

      setProducts(products.filter((p) => p._id !== productId));
      toast.success("Product deleted", {
        description: "Product has been removed successfully.",
      });
    } catch {
      toast.error("Error", {
        description: "Failed to delete product.",
      });
    }
  };

  // Edit product handler
  const handleEditProduct = async () => {
    if (!editProduct) return;
    const missingFields: string[] = [];
    if (!editProduct.title) missingFields.push("Title");
    if (!editProduct.price) missingFields.push("Price");
    if (editProduct.price && isNaN(Number(editProduct.price)))
      missingFields.push("Valid Price");

    if (missingFields.length > 0) {
      toast.error("Error", {
        description: `Please provide: ${missingFields.join(", ")}.`,
      });
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/products/${editProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editProduct.title,
          description: editProduct.description,
          price: Number(editProduct.price),
          category: editProduct.category,
          image: editProduct.image,
        }),
      });
      if (!res.ok) throw new Error("Failed to update product");
      const updated = await res.json();
      setProducts(products.map((p) => (p._id === updated._id ? updated : p)));
      setIsEditDialogOpen(false);
      setEditProduct(null);
      toast.success("Product updated", {
        description: "Product has been updated successfully.",
      });
    } catch {
      toast.error("Error", {
        description: "Could not update product.",
      });
    }
  };

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Total Orders",
      value: 156,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Total Revenue",
      value: "₹12,450",
      icon: DollarSign,
      color: "text-yellow-600",
    },
    { title: "Active Users", value: 89, icon: Users, color: "text-purple-600" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your poster shop</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your poster inventory</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new poster
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Poster title"
                    value={newProduct.title}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, title: e.target.value })
                    }
                  />
                  <Textarea
                    placeholder="Product description"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                  />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                  />
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) =>
                      setNewProduct({ ...newProduct, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bollywood">Bollywood</SelectItem>
                      <SelectItem value="anime">Anime</SelectItem>
                      <SelectItem value="basketball">Basketball</SelectItem>
                      <SelectItem value="cricket">Cricket</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="abstract">Abstract</SelectItem>
                      <SelectItem value="motivation">Motivation</SelectItem>
                      <SelectItem value="television">Television</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="nature">Nature</SelectItem>
                      <SelectItem value="vintage">Vintage</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const formData = new FormData();
                        formData.append("image", file);

                        try {
                          const res = await fetch(
                            "http://localhost:5000/api/products/upload",
                            {
                              method: "POST",
                              body: formData,
                            }
                          );

                          const data = await res.json();
                          setNewProduct((prev) => ({
                            ...prev,
                            image: data.url,
                          }));
                          toast.success("Upload successful", {
                            description: "Image uploaded and ready to use.",
                          });
                        } catch {
                          toast.error("Upload failed", {
                            description: "Could not upload image.",
                          });
                        }
                      }}
                    />
                    {newProduct.image && (
                      <img
                        src={newProduct.image}
                        alt="Preview"
                        className="w-24 h-24 rounded object-cover"
                      />
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={handleAddProduct} className="flex-1">
                      Add Product
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell className="capitalize">
                    {product.category}
                  </TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>{product.rating || 5}/5</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditProduct(product);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(product._id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details for this poster
            </DialogDescription>
          </DialogHeader>
          {editProduct && (
            <div className="space-y-4">
              <Input
                placeholder="Poster title"
                value={editProduct.title}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, title: e.target.value })
                }
              />
              <Textarea
                placeholder="Product description"
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
              />
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: Number(e.target.value) })
                }
              />
              <Select
                value={editProduct.category}
                onValueChange={(value) =>
                  setEditProduct({ ...editProduct, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bollywood">Bollywood</SelectItem>
                  <SelectItem value="anime">Anime</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="cricket">Cricket</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="abstract">Abstract</SelectItem>
                  <SelectItem value="motivation">Motivation</SelectItem>
                  <SelectItem value="television">Television</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                </SelectContent>
              </Select>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append("image", file);

                    try {
                      const res = await fetch(
                        "http://localhost:5000/api/products/upload",
                        {
                          method: "POST",
                          body: formData,
                        }
                      );

                      const data = await res.json();
                      setEditProduct((prev) =>
                        prev
                          ? {
                              ...prev,
                              image: data.url,
                            }
                          : prev
                      );
                      toast.success("Upload successful", {
                        description: "Image uploaded and ready to use.",
                      });
                    } catch {
                      toast.error("Upload failed", {
                        description: "Could not upload image.",
                      });
                    }
                  }}
                />
                {editProduct.image && (
                  <img
                    src={editProduct.image}
                    alt="Preview"
                    className="w-24 h-24 rounded object-cover"
                  />
                )}
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleEditProduct} className="flex-1">
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
